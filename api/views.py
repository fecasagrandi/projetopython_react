from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action, api_view
from rest_framework.authentication import SessionAuthentication
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.urls import get_resolver

from .models import Usuario, Categoria, Tarefa, Habito, Recompensa, Tarefa_Categoria, Usuario_Recompensa
from .serializers import (UsuarioSerializer, CategoriaSerializer, TarefaSerializer,
                          HabitoSerializer, RecompensaSerializer, Tarefa_CategoriaSerializer,
                          Usuario_RecompensaSerializer, TarefaDetalhadaSerializer,
                          HabitoDetalhadoSerializer, RecompensaDetalhadaSerializer)


class UsuarioViewSet(viewsets.ModelViewSet):
    """
    API para gerenciamento de usuários.
    
    Permite criar, visualizar, editar e excluir usuários no sistema Kaizen.
    Cada usuário possui um nome, email, senha e pontos acumulados.
    """
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        """
        Retorna os dados do usuário atual, incluindo seus pontos.
        
        Este endpoint é utilizado para obter informações do usuário logado,
        incluindo seu nome, email e quantidade de pontos acumulados.
        
        parameters:
          - name: id
            in: query
            description: ID do usuário
            required: true
            type: integer
            
        responses:
          200:
            description: Dados do usuário retornados com sucesso
          400:
            description: ID de usuário não fornecido
          404:
            description: Usuário não encontrado
        """
        # Em um ambiente real, usaríamos request.user
        # Como estamos simulando, vamos pegar o usuário pelo ID fornecido no parâmetro
        usuario_id = request.query_params.get('id')
        if not usuario_id:
            return Response({'error': 'ID de usuário não fornecido'}, status=status.HTTP_400_BAD_REQUEST)
            
        usuario = get_object_or_404(Usuario, id=usuario_id)
        serializer = self.get_serializer(usuario)
        return Response(serializer.data)


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer


class TarefaViewSet(viewsets.ModelViewSet):
    """
    API para gerenciamento de tarefas.
    
    Permite criar, visualizar, editar e excluir tarefas no sistema Kaizen.
    Cada tarefa possui título, descrição, prioridade, status, data de criação, 
    data de conclusão e pontos associados.
    
    As tarefas podem ser filtradas por usuário através do parâmetro de consulta 'usuario'.
    
    Endpoints disponíveis:
    * `GET /api/tarefas/` - Listar todas as tarefas
    * `POST /api/tarefas/` - Criar nova tarefa
    * `GET /api/tarefas/{id}/` - Obter detalhes de uma tarefa
    * `PUT /api/tarefas/{id}/` - Atualizar uma tarefa
    * `DELETE /api/tarefas/{id}/` - Excluir uma tarefa
    * `POST /api/tarefas/{id}/adicionar_categoria/` - Adicionar categoria a uma tarefa
    * `POST /api/tarefas/{id}/remover_categoria/` - Remover categoria de uma tarefa
    """
    serializer_class = TarefaSerializer
    
    def get_queryset(self):
        """
        Retorna as tarefas filtradas por usuário, se o parâmetro 'usuario' for fornecido.
        Caso contrário, retorna todas as tarefas.
        
        parameters:
          - name: usuario
            in: query
            description: ID do usuário para filtrar tarefas
            required: false
            type: integer
        """
        usuario_id = self.request.query_params.get('usuario', None)
        if usuario_id:
            return Tarefa.objects.filter(Usuario=usuario_id)
        return Tarefa.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TarefaDetalhadaSerializer
        return TarefaSerializer
        
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        
        # Corrigir o campo Usuario se for um array
        if 'Usuario' in data and isinstance(data['Usuario'], list) and data['Usuario']:
            data['Usuario'] = data['Usuario'][0]
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    @action(detail=True, methods=['post'])
    def adicionar_categoria(self, request, pk=None):
        tarefa = self.get_object()
        categoria_id = request.data.get('categoria_id')
        
        if not categoria_id:
            return Response({'error': 'categoria_id é obrigatório'}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            categoria = Categoria.objects.get(pk=categoria_id)
        except Categoria.DoesNotExist:
            return Response({'error': f'Categoria com id {categoria_id} não existe'}, 
                            status=status.HTTP_404_NOT_FOUND)
        
        # Verificar se a categoria já está associada à tarefa
        if Tarefa_Categoria.objects.filter(Tarefa=tarefa, Categoria=categoria).exists():
            return Response({'status': 'categoria já associada à tarefa'}, 
                            status=status.HTTP_200_OK)
        
        # Adicionar a categoria à tarefa
        Tarefa_Categoria.objects.create(Tarefa=tarefa, Categoria=categoria)
        return Response({'status': 'categoria adicionada'}, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def remover_categoria(self, request, pk=None):
        tarefa = self.get_object()
        categoria_id = request.data.get('categoria_id')
        tarefa_categoria = get_object_or_404(Tarefa_Categoria, Tarefa=tarefa, Categoria_id=categoria_id)
        tarefa_categoria.delete()
        return Response({'status': 'categoria removida'}, status=status.HTTP_200_OK)


class HabitoViewSet(viewsets.ModelViewSet):
    """
    API para gerenciamento de hábitos.
    
    Permite criar, visualizar, editar e excluir hábitos no sistema Kaizen.
    Cada hábito possui título, descrição, frequência, pontos associados e datas de conclusão.
    
    Os hábitos podem ser filtrados por usuário através do parâmetro de consulta 'usuario'.
    
    Endpoints disponíveis:
    * `GET /api/habitos/` - Listar todos os hábitos
    * `POST /api/habitos/` - Criar novo hábito
    * `GET /api/habitos/{id}/` - Obter detalhes de um hábito
    * `PUT /api/habitos/{id}/` - Atualizar um hábito
    * `DELETE /api/habitos/{id}/` - Excluir um hábito
    * `POST /api/habitos/{id}/completar/` - Marcar um hábito como completado
    """
    serializer_class = HabitoSerializer
    
    def get_queryset(self):
        """
        Retorna os hábitos filtrados por usuário, se o parâmetro 'usuario' for fornecido.
        Caso contrário, retorna todos os hábitos.
        
        parameters:
          - name: usuario
            in: query
            description: ID do usuário para filtrar hábitos
            required: false
            type: integer
        """
        usuario_id = self.request.query_params.get('usuario', None)
        if usuario_id:
            return Habito.objects.filter(Usuario=usuario_id)
        return Habito.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return HabitoDetalhadoSerializer
        return HabitoSerializer
        
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        
        if 'Usuario' in data and isinstance(data['Usuario'], list) and data['Usuario']:
            data['Usuario'] = data['Usuario'][0]
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def update(self, request, *args, **kwargs):
        # Verificar se o hábito está sendo completado
        if request.data.get('completado') == True:
            return self.completar_habito(request, *args, **kwargs)
        return super().update(request, *args, **kwargs)
    
    @action(detail=True, methods=['post'])
    def completar(self, request, pk=None):
        return self.completar_habito(request, pk=pk)
    
    def completar_habito(self, request, pk=None, **kwargs):
        habito = self.get_object()
        usuario = habito.Usuario
        pontos = habito.Pontos_Conclusao
        
        # Atualizar pontos do usuário se existir
        if usuario:
            usuario.Pontos = (usuario.Pontos or 0) + pontos
            usuario.save()
        
        # Retornar resposta com os pontos ganhos
        return Response({
            'status': 'hábito completado',
            'pontos_ganhos': pontos,
            'pontos_totais': usuario.Pontos if usuario else pontos
        }, status=status.HTTP_200_OK)


class RecompensaViewSet(viewsets.ModelViewSet):
    """
    API para gerenciamento de recompensas.
    
    Permite criar, visualizar, editar e excluir recompensas no sistema Kaizen.
    Cada recompensa possui título, descrição, pontos necessários para conquistá-la e status.
    
    Endpoints disponíveis:
    * `GET /api/recompensas/` - Listar todas as recompensas
    * `POST /api/recompensas/` - Criar nova recompensa
    * `GET /api/recompensas/{id}/` - Obter detalhes de uma recompensa
    * `PUT /api/recompensas/{id}/` - Atualizar uma recompensa
    * `DELETE /api/recompensas/{id}/` - Excluir uma recompensa
    * `POST /api/recompensas/{id}/conquistar/` - Conquistar uma recompensa
    * `DELETE /api/recompensas/{id}/desconquistar/` - Desconquistar uma recompensa
    """
    queryset = Recompensa.objects.all()
    serializer_class = RecompensaSerializer
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return RecompensaDetalhadaSerializer
        return RecompensaSerializer
    
    @action(detail=True, methods=['post'])
    def conquistar(self, request, pk=None):
        """
        Permite que um usuário conquiste uma recompensa.
        
        Este endpoint verifica se o usuário tem pontos suficientes para conquistar a recompensa,
        deduz os pontos necessários do saldo do usuário e registra a conquista.
        
        parameters:
          - name: pk
            in: path
            description: ID da recompensa a ser conquistada
            required: true
            type: integer
          - name: usuario_id
            in: body
            description: ID do usuário que está conquistando a recompensa
            required: true
            type: integer
            
        responses:
          200:
            description: Recompensa conquistada com sucesso
            schema:
              properties:
                status:
                  type: string
                  example: recompensa conquistada
                pontos_restantes:
                  type: integer
                  description: Pontos restantes do usuário após a conquista
          400:
            description: Erro ao conquistar recompensa
            schema:
              properties:
                status:
                  type: string
                  example: pontos insuficientes
                pontos_usuario:
                  type: integer
                  description: Pontos atuais do usuário
                pontos_necessarios:
                  type: integer
                  description: Pontos necessários para conquistar a recompensa
        """
        recompensa = self.get_object()
        usuario_id = request.data.get('usuario_id')
        usuario = get_object_or_404(Usuario, pk=usuario_id)
        
        # Verificar se o usuário já conquistou esta recompensa
        if Usuario_Recompensa.objects.filter(Usuario=usuario, Recompensa=recompensa).exists():
            return Response({'status': 'recompensa já conquistada'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Verificar se o usuário tem pontos suficientes
        if usuario.Pontos < recompensa.Pontos:
            return Response({
                'status': 'pontos insuficientes',
                'pontos_usuario': usuario.Pontos,
                'pontos_necessarios': recompensa.Pontos
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Deduzir os pontos do usuário
        usuario.Pontos -= recompensa.Pontos
        usuario.save()
        
        # Registrar a conquista da recompensa
        Usuario_Recompensa.objects.create(Usuario=usuario, Recompensa=recompensa)
        
        return Response({
            'status': 'recompensa conquistada',
            'pontos_restantes': usuario.Pontos
        }, status=status.HTTP_200_OK)
        
    @action(detail=True, methods=['delete'])
    def desconquistar(self, request, pk=None):
        recompensa = self.get_object()
        usuario_id = request.data.get('usuario_id')
        usuario = get_object_or_404(Usuario, pk=usuario_id)
        
        # Verificar se o usuário já conquistou esta recompensa
        relacao = Usuario_Recompensa.objects.filter(Usuario=usuario, Recompensa=recompensa).first()
        if not relacao:
            return Response({'status': 'recompensa não conquistada'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Devolver os pontos ao usuário
        usuario.Pontos += recompensa.Pontos
        usuario.save()
        
        # Remover a conquista da recompensa
        relacao.delete()
        
        return Response({
            'status': 'recompensa desconquistada',
            'pontos_restantes': usuario.Pontos
        }, status=status.HTTP_200_OK)


class RegisterView(generics.CreateAPIView):
    """
    API para registro de novos usuários.
    
    Permite que novos usuários se registrem no sistema Kaizen.
    Retorna os dados do usuário criado e uma mensagem de sucesso em caso de registro bem-sucedido.
    
    Endpoint:
    * `POST /api/register/` - Registrar novo usuário
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = UsuarioSerializer
    
    def create(self, request, *args, **kwargs):
        """
        Cria um novo usuário no sistema.
        
        parameters:
          - name: Nome_Usuario
            in: body
            description: Nome do usuário
            required: true
            type: string
          - name: Email
            in: body
            description: Email do usuário
            required: true
            type: string
          - name: password
            in: body
            description: Senha do usuário
            required: true
            type: string
            format: password
            
        responses:
          201:
            description: Usuário criado com sucesso
            schema:
              properties:
                user:
                  type: object
                  description: Dados do usuário criado
                message:
                  type: string
                  description: Mensagem de sucesso
          400:
            description: Dados inválidos
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            'user': UsuarioSerializer(user).data,
            'message': 'Usuário criado com sucesso!'
        }, status=status.HTTP_201_CREATED)


class LoginView(generics.GenericAPIView):
    """
    API para autenticação de usuários.
    
    Permite que usuários façam login no sistema Kaizen usando email e senha.
    Retorna os dados do usuário e uma mensagem de sucesso em caso de login bem-sucedido.
    
    Endpoint:
    * `POST /api/login/` - Realizar login
    """
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        """
        Realiza o login do usuário.
        
        parameters:
          - name: email
            in: body
            description: Email do usuário
            required: true
            type: string
          - name: password
            in: body
            description: Senha do usuário
            required: true
            type: string
            format: password
            
        responses:
          200:
            description: Login realizado com sucesso
            schema:
              properties:
                user:
                  type: object
                  description: Dados do usuário
                message:
                  type: string
                  description: Mensagem de sucesso
          400:
            description: Credenciais inválidas
        """
        email = request.data.get('email')
        password = request.data.get('password')
        
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            serializer = UsuarioSerializer(user)
            return Response({
                'user': serializer.data,
                'message': 'Login realizado com sucesso!'
            })
        return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_400_BAD_REQUEST)


class TarefasUsuarioView(generics.ListAPIView):
    serializer_class = TarefaSerializer
    
    def get_queryset(self):
        usuario_id = self.kwargs['usuario_id']
        return Tarefa.objects.filter(Usuario_id=usuario_id)


class HabitosUsuarioView(generics.ListAPIView):
    serializer_class = HabitoSerializer
    
    def get_queryset(self):
        usuario_id = self.kwargs['usuario_id']
        return Habito.objects.filter(Usuario_id=usuario_id)


class RecompensasUsuarioView(generics.ListAPIView):
    serializer_class = RecompensaSerializer
    
    def get_queryset(self):
        usuario_id = self.kwargs['usuario_id']
        usuario = get_object_or_404(Usuario, pk=usuario_id)
        return usuario.recompensas.all()
