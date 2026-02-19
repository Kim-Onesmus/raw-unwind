from pathlib import Path
import os
from pathlib import Path
import os
from dotenv import load_dotenv
import dj_database_url
load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-c72ya@s=g6y#ly@p2v4ugiuum_pct+rp^!lbeeof2-=bih_v)f'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'storages',
    'ckeditor',
    'ckeditor_uploader',
    'app',
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'rawunwind.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates'
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'rawunwind.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    DATABASES = {
        'default': dj_database_url.parse(
            os.getenv('DATABASE_URL')
        )
    }


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True



# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

# Static files settings (for both modes)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles_build', 'static')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'app/static')
]

CKEDITOR_UPLOAD_PATH = "uploads/ckeditor/"

if DEBUG:
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')

else:
    STORAGES = {
        "default": {
            "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
        },
        "staticfiles": {
            "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
        },
    }
    AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
    AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
    AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
    AWS_S3_REGION_NAME = os.getenv('AWS_S3_REGION_NAME')
    AWS_QUERYSTRING_EXPIRE = 6000

    CKEDITOR_STORAGE_BACKEND = 'storages.backends.s3boto3.S3Boto3Storage'



# =========================
# JAZZMIN ADMIN SETTINGS
# =========================

JAZZMIN_SETTINGS = {
    # Site Identity
    "site_title": "Raw Unwind Admin",
    "site_header": "Raw Unwind Admin",
    "site_brand": "Raw Unwind",
    "welcome_sign": "Welcome to Raw Unwind Admin",
    "copyright": "© 2025 Raw Unwind",

    # Logos
    "login_logo": "images/logo.png",
    "site_icon": "images/logo.png",

    # Search
    "search_model": ["auth.User", "auth.Group"],

    # Top Menu
    "topmenu_links": [
        {"name": "Dashboard", "url": "admin:index"},
        {"model": "auth.User"},
        {"model": "auth.Group"},
    ],

    # User Menu
    "usermenu_links": [
        {"name": "Support", "url": "https://example.com/support", "new_window": True},
    ],

    # Icons
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-users",
    },

    # UI Behavior
    "show_ui_builder": True,
    "related_modal_active": True,
    "language_chooser": False,

    # Default Icons
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-circle",

    # Custom CSS
    "custom_css": "css/admin_custom.css",
}


JAZZMIN_UI_TWEAKS = {
    # Theme & Fonts
    "theme": "flatly",
    "dark_mode_theme": "darkly",
    "font": "Roboto",

    # Layout
    "layout_boxed": False,
    "fixed_sidebar": True,
    "fixed_navbar": True,
    "fixed_footer": False,

    # Text Sizes
    "body_small_text": False,
    "footer_small_text": False,
    "brand_small_text": False,
    "navbar_small_text": False,
    "sidebar_nav_small_text": False,

    # Navbar (GREEN)
    "navbar": "navbar-success navbar-dark",
    "no_navbar_border": False,

    # Sidebar (GREEN)
    "sidebar": "sidebar-dark-success",
    "brand_colour": "navbar-success",
    "accent": "accent-success",

    # Sidebar behavior
    "sidebar_nav_flat_style": True,
    "sidebar_nav_child_indent": True,
    "sidebar_disable_expand": False,

    # Buttons (GREEN CONSISTENT)
    "button_classes": {
        "primary": "btn btn-success",
        "secondary": "btn btn-outline-success",
        "info": "btn btn-outline-success",
        "warning": "btn btn-warning",
        "danger": "btn btn-danger",
        "success": "btn btn-success",
    }
}
