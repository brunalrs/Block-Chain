(ns repositorios.financeiro)

(def transacoes-db (atom []))

(defn ler-transacoes [] @transacoes-db)

(defn receita? [transacao]
  (= (:tipo transacao) "receita"))

(defn calcular-saldo [total transacao]
  (let [valor (:valor transacao)]
    (if (receita? transacao)
      (+ total valor)
      (- total valor))))

(defn saldo []
  (reduce calcular-saldo 0 @transacoes-db))

(defn criar-transacao [requisicao] (swap! transacoes-db conj (merge requisicao {:id (+ (count @transacoes-db) 1)})))