from django.contrib import admin
from .models import Usuario, Categoria, Tarefa, Habito, Recompensa, Tarefa_Categoria, Usuario_Recompensa


@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'Nome_Usuario', 'Email', 'is_active')
    search_fields = ('Nome_Usuario', 'Email')
    list_filter = ('is_active', 'is_staff', 'date_joined')


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'Nome_Categoria')
    search_fields = ('Nome_Categoria',)


@admin.register(Tarefa)
class TarefaAdmin(admin.ModelAdmin):
    list_display = ('id', 'Titulo_Tarefa', 'Status_Tarefa', 'Prioridade', 'Data_Limite', 'Usuario')
    list_filter = ('Status_Tarefa', 'Prioridade', 'Data_Limite')
    search_fields = ('Titulo_Tarefa', 'Descricao')
    raw_id_fields = ('Usuario',)


@admin.register(Habito)
class HabitoAdmin(admin.ModelAdmin):
    list_display = ('id', 'Nome_Habito', 'Frequencia', 'Usuario')
    list_filter = ('Frequencia', 'Data_Criacao')
    search_fields = ('Nome_Habito', 'Descricao')
    raw_id_fields = ('Usuario',)


@admin.register(Recompensa)
class RecompensaAdmin(admin.ModelAdmin):
    list_display = ('id', 'Titulo_Recompensa', 'Pontos')
    search_fields = ('Titulo_Recompensa', 'Descricao')


@admin.register(Tarefa_Categoria)
class Tarefa_CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'Tarefa', 'Categoria')
    raw_id_fields = ('Tarefa', 'Categoria')


@admin.register(Usuario_Recompensa)
class Usuario_RecompensaAdmin(admin.ModelAdmin):
    list_display = ('id', 'Usuario', 'Recompensa', 'Data_Conquista')
    raw_id_fields = ('Usuario', 'Recompensa')
    list_filter = ('Data_Conquista',)
