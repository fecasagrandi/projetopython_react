from rest_framework import serializers
from .models import Usuario, Categoria, Tarefa, Habito, Recompensa, Tarefa_Categoria, Usuario_Recompensa
from django.utils import timezone


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'Nome_Usuario', 'Email', 'password', 'Pontos']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = Usuario.objects.create_user(
            Email=validated_data['Email'],
            Nome_Usuario=validated_data['Nome_Usuario'],
            password=validated_data['password']
        )
        return user


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class CategoriaSimplificadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'Nome_Categoria']

class TarefaSerializer(serializers.ModelSerializer):
    # Definir o campo categorias_ids como opcional e aceitar valores vazios
    categorias_ids = serializers.ListField(child=serializers.IntegerField(), required=False, write_only=True, allow_empty=True)
    # Adicionar campo para retornar as categorias associadas
    Categorias = CategoriaSimplificadaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Tarefa
        fields = '__all__'
        
    def validate_Data_Limite(self, value):
        if value < timezone.now().date():
            raise serializers.ValidationError('A Data_Limite não pode estar no passado.')
        return value
    
    def validate(self, data):
        if not data.get('Titulo_Tarefa'):
            raise serializers.ValidationError('O Título da Tarefa é obrigatório.')
        if not data.get('Descricao'):
            raise serializers.ValidationError('A Descrição é obrigatória.')
        return data
        
    def create(self, validated_data):
        # Extrair categorias_ids se existir
        categorias_ids = validated_data.pop('categorias_ids', [])
        
        # Se não houver usuário fornecido, use o primeiro usuário ou crie um
        if 'Usuario' not in validated_data:
            usuario, created = Usuario.objects.get_or_create(
                Email='usuario_padrao@kaizen.com',
                defaults={'Nome_Usuario': 'Usuario Padrão', 'password': 'senha123'}
            )
            validated_data['Usuario'] = usuario
            
        # Criar a tarefa
        tarefa = super().create(validated_data)
        
        # Adicionar categorias se fornecidas
        if categorias_ids:
            for categoria_id in categorias_ids:
                try:
                    categoria = Categoria.objects.get(pk=categoria_id)
                    Tarefa_Categoria.objects.create(Tarefa=tarefa, Categoria=categoria)
                except Categoria.DoesNotExist:
                    pass  # Ignorar categorias que não existem
                    
        return tarefa
        
    def update(self, instance, validated_data):
        # Extrair categorias_ids se existir
        categorias_ids = validated_data.pop('categorias_ids', [])
        
        # Atualizar a tarefa
        instance = super().update(instance, validated_data)
        
        # Sempre remover todas as categorias existentes
        Tarefa_Categoria.objects.filter(Tarefa=instance).delete()
        
        # Adicionar as novas categorias (se houver)
        for categoria_id in categorias_ids:
            try:
                categoria = Categoria.objects.get(pk=categoria_id)
                Tarefa_Categoria.objects.create(Tarefa=instance, Categoria=categoria)
            except Categoria.DoesNotExist:
                pass  # Ignorar categorias que não existem
                    
        return instance


class HabitoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habito
        fields = '__all__'
        
    def validate(self, data):
        if not data.get('Nome_Habito'):
            raise serializers.ValidationError('O Nome do Hábito é obrigatório.')
        if not data.get('Descricao'):
            raise serializers.ValidationError('A Descrição é obrigatória.')
        return data
        
    def create(self, validated_data):
        # Se não houver usuário fornecido, use o primeiro usuário ou crie um
        if 'Usuario' not in validated_data:
            usuario, created = Usuario.objects.get_or_create(
                Email='usuario_padrao@kaizen.com',
                defaults={'Nome_Usuario': 'Usuario Padrão', 'password': 'senha123'}
            )
            validated_data['Usuario'] = usuario
        return super().create(validated_data)


class RecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recompensa
        fields = '__all__'
        
    def validate_Pontos(self, value):
        if value <= 0:
            raise serializers.ValidationError('Os Pontos devem ser positivos.')
        return value


class Tarefa_CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarefa_Categoria
        fields = '__all__'


class Usuario_RecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario_Recompensa
        fields = '__all__'


class TarefaDetalhadaSerializer(serializers.ModelSerializer):
    Usuario = UsuarioSerializer(read_only=True)
    Categorias = CategoriaSerializer(many=True, read_only=True)
    
    class Meta:
        model = Tarefa
        fields = '__all__'


class HabitoDetalhadoSerializer(serializers.ModelSerializer):
    Usuario = UsuarioSerializer(read_only=True)
    
    class Meta:
        model = Habito
        fields = '__all__'


class RecompensaDetalhadaSerializer(serializers.ModelSerializer):
    Usuarios = UsuarioSerializer(many=True, read_only=True)
    
    class Meta:
        model = Recompensa
        fields = '__all__'
