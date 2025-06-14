// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Funcionalidade de Pesquisa (Search Bar) ---
    const searchInput = document.getElementById('searchInput');
    const ebookGrid = document.getElementById('ebookGrid');
    const ebookCards = ebookGrid ? Array.from(ebookGrid.getElementsByClassName('ebook-card')) : []; // Converte HTMLCollection para Array

    // Verifica se os elementos existem antes de adicionar event listeners
    if (searchInput && ebookGrid) {
        searchInput.addEventListener('keyup', filterEbooks);
    }

    // --- Funcionalidade de Filtragem por Letra ---
    const letterFilterContainer = document.getElementById('letterFilter');
    if (letterFilterContainer) {
        letterFilterContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('filter-item')) {
                // Remove a classe 'active' de todos os itens de filtro
                Array.from(letterFilterContainer.children).forEach(item => item.classList.remove('active'));
                // Adiciona a classe 'active' ao item clicado
                event.target.classList.add('active');
                filterEbooks(); // Chama a função de filtro
            }
        });
    }

    // --- Funcionalidade de Filtragem por Categoria (Dropdown) ---
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterEbooks);
    }

    // --- Função Principal de Filtragem de eBooks ---
    function filterEbooks() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const selectedLetter = letterFilterContainer ? letterFilterContainer.querySelector('.filter-item.active')?.dataset.filter : 'all';
        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';

        ebookCards.forEach(card => {
            const title = card.querySelector('h4').textContent.toLowerCase();
            const categories = card.dataset.category ? card.dataset.category.toLowerCase().split(' ') : [];

            // Verifica a pesquisa por termo
            const matchesSearch = title.includes(searchTerm);

            // Verifica a filtragem por letra
            const matchesLetter = selectedLetter === 'all' || title.startsWith(selectedLetter.toLowerCase());

            // Verifica a filtragem por categoria
            const matchesCategory = selectedCategory === 'all' || categories.includes(selectedCategory);

            // Se todas as condições forem verdadeiras, mostra o card; caso contrário, oculta
            if (matchesSearch && matchesLetter && matchesCategory) {
                card.style.display = 'flex'; // Exibe o card como flex para manter o layout grid
            } else {
                card.style.display = 'none'; // Oculta o card
            }
        });
    }

    // --- Botão Voltar ao Topo ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        // Mostra ou oculta o botão baseado na posição de rolagem
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Mostra o botão após rolar 300px
                scrollToTopBtn.style.display = 'flex'; // Use 'flex' para manter o centramento do ícone
                scrollToTopBtn.style.opacity = '1'; // Torna visível
            } else {
                scrollToTopBtn.style.opacity = '0'; // Torna invisível
                // Adicione um pequeno delay antes de display: none para permitir a transição
                setTimeout(() => {
                    if (scrollToTopBtn.style.opacity === '0') { // Verifica se ainda está oculto
                        scrollToTopBtn.style.display = 'none';
                    }
                }, 300); // Tempo da transição CSS
            }
        });

        // Rolagem suave ao clicar no botão
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Animação de rolagem suave
            });
        });
    }

    // Chama o filtro uma vez ao carregar a página para aplicar os filtros iniciais (Todos, Todas as Categorias)
    filterEbooks();
});