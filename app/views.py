from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from .models import LegacyPortfolio
from django.urls import reverse

def latest_legacy_portfolio(request):
    # Get the latest 3 active portfolios
    portfolios = LegacyPortfolio.objects.filter(is_active=True).order_by('-created_at')[:3]
    
    data = []
    for p in portfolios:
        data.append({
            "title": p.title,
            "url": reverse('legacy_portfolio_detail', args=[p.slug]),
            "image": p.main_image.url if p.main_image else "",
            "tags": p.tags,
            "includes": p.includes,
            "date": p.date,
            "duration_days": p.duration_days,
            "duration_nights": p.duration_nights,
            "duration_hours": getattr(p, 'duration_hours', 0),
            "price": str(p.price),
            "currency": p.currency,
            "content": p.content[:100] + '...' if p.content else '',
        })
    
    return JsonResponse(data, safe=False)


# Create your views here.
def Index(request):
    return render(request, 'app/homes.html')

def About(request):
    return render(request, 'app/about.html')

def Contact(request):
    return render(request, 'app/contact.html')

def AkibaSafaris(request):
    return render(request, 'app/akiba_safaris.html')

def legacyPortfolio(request):
    return render(request, 'app/legacy_portfolio.html')

def legacy_portfolio_detail(request, slug):
    portfolio = get_object_or_404(
        LegacyPortfolio,
        slug=slug,
        is_active=True
    )

    return render(request, "app/blog/detail.html",
        {
            "portfolio": portfolio
        }
    )

def Mombasa(request):
    return render(request, 'app/blog/mombasa.html')

def Manifesto(request):
    return render(request, 'app/manifesto.html')
