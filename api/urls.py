from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

from . import views

schema_view = get_schema_view(
    openapi.Info(
        title="Kaizen API",
        default_version='v1',
        description="""API para o Kaizen, um gerenciador de tarefas com gamificação.
        
## Visão Geral

O Kaizen é um sistema de gerenciamento de tarefas com elementos de gamificação que permite aos usuários:
- Criar e gerenciar tarefas com diferentes prioridades e categorias
- Estabelecer hábitos recorrentes para desenvolver disciplina
- Ganhar pontos ao completar tarefas e hábitos
- Utilizar esses pontos para conquistar recompensas personalizadas
- Acompanhar seu progresso através de estatísticas

## Autenticação

A API utiliza autenticação baseada em tokens. Para acessar endpoints protegidos, é necessário estar autenticado.

## Modelos Principais

- **Usuario**: Gerencia usuários e seus pontos
- **Tarefa**: Gerencia tarefas com prioridades e status
- **Habito**: Gerencia hábitos recorrentes
- **Categoria**: Classifica tarefas
- **Recompensa**: Gerencia recompensas que podem ser conquistadas com pontos
        """,
        terms_of_service="https://www.kaizen.com/terms/",
        contact=openapi.Contact(email="contato@kaizen.com", name="Equipe Kaizen"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'categorias', views.CategoriaViewSet)
router.register(r'tarefas', views.TarefaViewSet, basename='tarefa')
router.register(r'habitos', views.HabitoViewSet, basename='habito')
router.register(r'recompensas', views.RecompensaViewSet)

@api_view(['GET'])
def api_urls(request):
    """View para listar todas as URLs disponíveis na API"""
    urls = []
    for pattern in router.urls:
        urls.append({
            'name': pattern.name,
            'url': str(pattern.pattern),
        })
    return Response(urls)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('usuarios/<int:usuario_id>/tarefas/', views.TarefasUsuarioView.as_view(), name='usuario-tarefas'),
    path('urls/', api_urls, name='api-urls'),
    path('usuarios/<int:usuario_id>/habitos/', views.HabitosUsuarioView.as_view(), name='usuario-habitos'),
    path('usuarios/<int:usuario_id>/recompensas/', views.RecompensasUsuarioView.as_view(), name='usuario-recompensas'),
    
    # Documentação das API's 
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
