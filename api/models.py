from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


def validate_data_limite(value):
    if value < timezone.now().date():
        raise ValidationError('A Data_Limite não pode estar no passado.')


def validate_pontos_positivos(value):
    if value <= 0:
        raise ValidationError('Os Pontos devem ser positivos.')


class UsuarioManager(BaseUserManager):
    def create_user(self, Email, Nome_Usuario, password=None):
        if not Email:
            raise ValueError('Usuários devem ter um email')
        user = self.model(
            Email=self.normalize_email(Email),
            Nome_Usuario=Nome_Usuario,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, Email, Nome_Usuario, password):
        user = self.create_user(
            Email=Email,
            Nome_Usuario=Nome_Usuario,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Usuario(AbstractBaseUser, PermissionsMixin):
    Nome_Usuario = models.CharField(max_length=100, unique=True)
    Email = models.EmailField(max_length=255, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    Pontos = models.PositiveIntegerField(default=0)
    
    USERNAME_FIELD = 'Email'
    REQUIRED_FIELDS = ['Nome_Usuario']
    
    objects = UsuarioManager()
    
    def __str__(self):
        return self.Nome_Usuario


class Categoria(models.Model):
    Nome_Categoria = models.CharField(max_length=100)
    
    def __str__(self):
        return self.Nome_Categoria


class Tarefa(models.Model):
    STATUS_CHOICES = (
        ('pendente', 'Pendente'),
        ('em_andamento', 'Em Andamento'),
        ('concluida', 'Concluída'),
    )
    
    PRIORIDADE_CHOICES = (
        ('baixa', 'Baixa'),
        ('media', 'Média'),
        ('alta', 'Alta'),
    )
    
    Titulo_Tarefa = models.CharField(max_length=200, blank=False, null=False)
    Descricao = models.TextField(blank=False, null=False)
    Data_Limite = models.DateField(validators=[validate_data_limite])
    Status_Tarefa = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')
    Prioridade = models.CharField(max_length=20, choices=PRIORIDADE_CHOICES, default='media')
    Data_Criacao = models.DateTimeField(auto_now_add=True)
    Usuario = models.ForeignKey(Usuario, related_name='tarefas', on_delete=models.CASCADE, null=True, blank=True)
    Categorias = models.ManyToManyField(Categoria, related_name='tarefas', through='Tarefa_Categoria')
    
    def __str__(self):
        return self.Titulo_Tarefa
    
    def clean(self):
        super().clean()
        validate_data_limite(self.Data_Limite)


class Tarefa_Categoria(models.Model):
    Tarefa = models.ForeignKey(Tarefa, on_delete=models.CASCADE)
    Categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Tarefa-Categoria'
        verbose_name_plural = 'Tarefas-Categorias'
        unique_together = ('Tarefa', 'Categoria')


class Habito(models.Model):
    FREQUENCIA_CHOICES = (
        ('diaria', 'Diária'),
        ('semanal', 'Semanal'),
        ('mensal', 'Mensal'),
    )
    
    Nome_Habito = models.CharField(max_length=200, blank=False, null=False)
    Descricao = models.TextField(blank=False, null=False)
    Frequencia = models.CharField(max_length=20, choices=FREQUENCIA_CHOICES, default='diaria')
    Pontos_Conclusao = models.PositiveIntegerField(default=10)
    Data_Criacao = models.DateTimeField(auto_now_add=True)
    Usuario = models.ForeignKey(Usuario, related_name='habitos', on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.Nome_Habito


class Recompensa(models.Model):
    Titulo_Recompensa = models.CharField(max_length=200)
    Pontos = models.PositiveIntegerField(validators=[validate_pontos_positivos])
    Descricao = models.TextField()
    Usuarios = models.ManyToManyField(Usuario, related_name='recompensas', through='Usuario_Recompensa')
    
    def __str__(self):
        return self.Titulo_Recompensa
    
    def clean(self):
        super().clean()
        validate_pontos_positivos(self.Pontos)


class Usuario_Recompensa(models.Model):
    Usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    Recompensa = models.ForeignKey(Recompensa, on_delete=models.CASCADE)
    Data_Conquista = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Usuário-Recompensa'
        verbose_name_plural = 'Usuários-Recompensas'
        unique_together = ('Usuario', 'Recompensa')
