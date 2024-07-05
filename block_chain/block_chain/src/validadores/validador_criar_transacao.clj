(ns validadores.validador-criar-transacao)

(defn validador-criar-transacao [transacao]
  (let [chaves-validas #{:valor :tipo}]
        (and 
            (contains? transacao :valor)
            (pos? (float (:valor transacao)))
            (contains? transacao :tipo)
            (or (= (:tipo transacao) "receita")
                (= (:tipo transacao) "despesa"))
            (= chaves-validas (set (keys transacao))))))
