from django.shortcuts import render

# Create your views here.
def Index(request):
    return render(request, 'app/homes.html')

def About(request):
    return render(request, 'app/about.html')

def Contact(request):
    return render(request, 'app/contact.html')

def AkibaSafaris(request):
    return render(request, 'app/akiba_safaris.html')

def LegacyPortfolio(request):
    return render(request, 'app/legacy_portfolio.html')

def Safari(request):
    return render(request, 'app/blog/safari.html')

def Mombasa(request):
    return render(request, 'app/blog/mombasa.html')

def Manifesto(request):
    return render(request, 'app/manifesto.html')
