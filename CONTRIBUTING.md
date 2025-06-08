# Como contribuir com o AngularNews

Olá! Primeiro, obrigado por dedicar seu tempo para contribuir com o **AngularNews**.  
Nosso projeto busca fornecer notícias personalizadas de forma moderna e colaborativa.  
Abaixo, você encontra diretrizes para contribuir e ajudar a melhorar nosso sistema.

---

## Índice

- [Como contribuir](#como-contribuir)
- [Enviando Problemas (Issues)](#enviando-problemas-issues)
- [Enviando Pull Requests](#enviando-pull-requests)
- [Fluxo de trabalho](#fluxo-de-trabalho)
- [Comandos úteis do Git](#comandos-úteis-do-git)
- [Contato](#contato)

---

## Como contribuir

1. **Faça um fork** do projeto no GitHub.
2. **Clone o seu fork** para sua máquina:
    ```bash
    git clone https://github.com/SEU_USUARIO/AngularNews.git
    cd AngularNews
    ```
3. **Crie uma branch** para sua feature/correção:
    ```bash
    git checkout -b minha-feature
    ```
4. **Implemente sua contribuição** (código, documentação, testes, etc.).
5. **Faça commit** das alterações:
    ```bash
    git add .
    git commit -m "Descrição clara da alteração"
    ```
6. **Envie sua branch** para seu fork:
    ```bash
    git push origin minha-feature
    ```
7. **Abra um Pull Request** para o repositório principal e aguarde a revisão.

---

## Enviando Problemas (Issues)

- Crie uma nova issue [aqui](https://github.com/SEU_USUARIO/AngularNews/issues/new/choose) detalhando ao máximo o problema ou sugestão.
- Inclua:
  - Sistema operacional, navegador (caso front-end), versão do Node/Angular/Ionic se relevante.
  - Passos para reproduzir o problema.
  - Comportamento esperado vs. comportamento real.
  - Prints de tela, logs ou outputs do terminal são bem-vindos.
- Antes, verifique se já existe uma issue semelhante aberta ou fechada.

---

## Enviando Pull Requests

- Certifique-se de que seu código está atualizado com a branch principal (`main`).
- Descreva claramente a proposta de alteração no PR.
- Sempre que possível, relacione a issue resolvida (ex: closes #12).
- Esteja aberto para feedbacks e ajustes solicitados durante a revisão.

---

## Fluxo de trabalho

Para conhecer o fluxo de trabalho detalhado de colaboração, veja o mindmap ou fluxograma disponível em  
[`angularnewsdocs/UseCase/fluxo_trabalho.md`](angularnewsdocs/UseCase/fluxo_trabalho.md).

---

## Comandos úteis do Git

```bash
# Clonar o repositório
git clone https://github.com/SEU_USUARIO/AngularNews.git

# Criar uma nova branch
git checkout -b minha-feature

# Verificar status das alterações
git status

# Adicionar arquivos alterados
git add .

# Commitar alterações
git commit -m "Descrição clara da alteração"

# Enviar branch para o fork
git push origin minha-feature

# Atualizar sua branch local com a main do repositório principal
git fetch upstream
git checkout main
git merge upstream/main
```

---

## Contato

Em caso de dúvidas, sugestões ou problemas, abra uma [issue](https://github.com/SEU_USUARIO/AngularNews/issues) ou envie um e-mail para [seu@email.com].

Obrigado por contribuir! 🚀

---
