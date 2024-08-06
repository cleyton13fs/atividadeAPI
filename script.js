document.getElementById('searchBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const token = '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';

    if (username) {
        fetch(`https://api.github.com/users/${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.message === "Not Found") {
                    alert("Usuário não encontrado!");
                } else {
                    document.getElementById('avatar').src = data.avatar_url;
                    document.getElementById('avatar').style.display = 'block';
                    document.getElementById('name').textContent = data.name || 'Nome não disponível';
                    document.getElementById('bio').textContent = data.bio || 'Biografia não disponível';

                    // Fetch repositories
                    fetch(`https://api.github.com/users/${username}/repos`)
                        .then(response => response.json())
                        .then(repos => {
                            const reposList = document.getElementById('repos');
                            reposList.innerHTML = '';

                            repos.forEach(repo => {
                                const repoItem = document.createElement('li');
                                repoItem.textContent = repo.name;
                                reposList.appendChild(repoItem);
                            });
                        })
                        .catch(error => {
                            console.error('Erro ao buscar repositórios:', error);
                            alert('Ocorreu um erro ao buscar os repositórios do usuário.');
                        });
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Ocorreu um erro ao buscar as informações do usuário.');
            });
    } else {
        alert("Por favor, insira um nome de usuário.");
    }
});
