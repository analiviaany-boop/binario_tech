======================================================================
              SISTEMA DE DEPLOY AUTOMATIZADO - BINÁRIO TECH
======================================================================

--- HISTÓRICO DE VERSIONAMENTO ---

[v1.0.1] - 2026-10-01
- Atualização do endpoint `/api/v1/versao` para responder com a versão 1.0.1.
- Implementação de registo de histórico no script `deploy.sh` em `deploy_history.log`.
- Configuração do Git Hook `post-commit` (`aula21/.git/hooks/post-commit`) acionado via `core.hooksPath`.
- Ajuste de caminhos dinâmicos no `deploy.sh` para compatibilidade entre ecossistemas (Genesis / Cloud Shell).

[v1.0.0] - Versão Inicial
- Criação da API Express com suporte a variáveis de ambiente (`dotenv`).
- Integração do PM2 para gestão de processos da aplicação (`api-cicd`).
- Pipeline de deploy automatizado (`deploy.sh`) com Smoke Test na porta 3001.

======================================================================
--- ESTRUTURA DO PROJETO E ARQUIVOS DE DEPLOY ---

aula21/
├── server.js              # Servidor Express com a rota /api/v1/versao
├── package.json           # Dependências da aplicação
├── deploy.sh              # Script principal de automação do deploy
├── deploy_history.log     # Registo automático dos commits e datas de deploy
└── .git/hooks/
    └── post-commit        # Git Hook acionado após commits na branch main

======================================================================
--- FLUXO DE EXECUÇÃO E AUTOMAÇÃO ---

1. Configuração do Git Hook Local:
   $git config core.hooksPath aula21/.git/hooks$ chmod +x .git/hooks/post-commit

2. Execução do Deploy Manual:
   $ ./deploy.sh

3. Execução Automatizada:
   A cada commit efetuado na branch `main`, o Git dispara o hook `post-commit`
   que executa automaticamente o `./deploy.sh` e atualiza o `deploy_history.log`.
======================================================================
