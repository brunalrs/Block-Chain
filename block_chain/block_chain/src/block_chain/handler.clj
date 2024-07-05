;; Importações
(ns block-chain.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route] ;;definir rotas e tratar rotas não encontradas
            [ring.middleware.defaults :refer [wrap-defaults api-defaults]] ;;config padrão
            [repositorios.financeiro :refer [criar-transacao ler-transacoes saldo]]
            [ring.middleware.json :refer [wrap-json-body]] ;; p/ trabalhar c JSON
            [cheshire.core :as json]
            [repositorios.block-chain :refer [ler-blocos criar-bloco]]
            [validadores.validador-criar-transacao :refer [validador-criar-transacao]]
            [ring.middleware.cors :refer [wrap-cors]]
            ))

  

;; Converte em json e retorna HTTP com o status
(defn como-json
  ([conteudo]
   (como-json conteudo 200))
  ([conteudo status]
   {:status status
    :headers {"Content-Type" "application/json; charset=utf-8"}
    :body (json/generate-string conteudo)}))


;; Definição das rotas
(defroutes app-routes
  ;; (GET  "/" [] (route/resources "index.html" {:root "public"}))
  (GET "/saldo" [] (como-json {:saldo (saldo)}))
  (GET "/transacoes" [] 
    (->   
      (ler-transacoes) 
      (como-json)))
  (POST "/criar-transacao" requisicao 
    (if (validador-criar-transacao (:body requisicao))
      (-> 
        (criar-transacao (:body requisicao)) 
        (como-json))
      (como-json {:mensagem "requisicao possui chaves e/ou valores errados!"} 400)))
  (GET "/blocos" [] (-> (ler-blocos) (como-json)))
  (POST "/minerar" [] (-> (criar-bloco) (como-json)))

  (route/not-found "Not Found"))

(def app
  (->
   (wrap-defaults app-routes api-defaults)
   (wrap-json-body {:keywords? true :bigdecimals? true})
   (wrap-cors :access-control-allow-origin [#"http://localhost:5173"]
              :access-control-allow-methods [:get :post :put :delete])))
