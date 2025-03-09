(function() {
    // Função para obter o valor do cookie pelo nome
    function ReadCookie(name) {
        name += '=';
        var parts = document.cookie.split(/;\s*/);
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part.indexOf(name) === 0) return part.substring(name.length);
        }
        return '';
    }

    // Função para adicionar o parâmetro sub20 a links específicos
    function addSub20ToLinks() {
        const sessid2Value = ReadCookie('sessid2');
        if (sessid2Value) {
            const links = document.querySelectorAll('a[href*="/click/"]');
            links.forEach(link => {
                const url = new URL(link.href, window.location.origin);
                url.searchParams.set('sub20', sessid2Value); // Adiciona o parâmetro como sub20
                link.href = url.toString();
            });
        }
    }

    // Executa a função para os links que já estão no DOM
    addSub20ToLinks();

    // Observa mudanças no DOM para links adicionados dinamicamente
    const observer = new MutationObserver(() => addSub20ToLinks());
    observer.observe(document.body, { childList: true, subtree: true });
})();
