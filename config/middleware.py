from django.utils.html import mark_safe

class AdminBackButtonMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Hanya inject untuk halaman admin
        if '/admin/' in request.path and response.get('Content-Type', '').startswith('text/html'):
            if hasattr(response, 'content'):
                content = response.content.decode('utf-8')
                
                back_button = '''
                <style>
                    .admin-back-btn {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 1000;
                        display: inline-flex;
                        align-items: center;
                        gap: 8px;
                        padding: 8px 16px;
                        background-color: #10b981;
                        color: white;
                        border-radius: 8px;
                        font-weight: 500;
                        font-size: 14px;
                        text-decoration: none;
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                        transition: background-color 0.3s ease;
                    }
                    .admin-back-btn:hover {
                        background-color: #059669;
                    }
                    .admin-back-btn svg {
                        width: 16px;
                        height: 16px;
                    }
                </style>
                <a href="/" class="admin-back-btn" title="Kembali ke halaman user">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    Kembali ke User
                </a>
                '''
                
                # Inject sebelum </body>
                if '</body>' in content:
                    content = content.replace('</body>', back_button + '</body>')
                    response.content = content.encode('utf-8')
        
        return response
