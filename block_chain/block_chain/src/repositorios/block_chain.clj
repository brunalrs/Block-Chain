(ns repositorios.block-chain (:import [java.security MessageDigest]) (:require [repositorios.financeiro :refer [ler-transacoes]]))

(defn sha-256 [string]
  (let [digest (.digest (MessageDigest/getInstance "SHA-256") (.getBytes string "UTF-8"))] ;;armazenar o hash
    (apply str (map (partial format "%02x") digest)))) ;;bytes -> string hexadecimal

(def blocos-db (atom []))

(defn ler-blocos [] @blocos-db)

(defn hash-valido? [hash dif]
  (.startsWith hash  (apply str (repeat dif "0"))))

(defn prova-de-trabalho [nonce transacoes hash-anterior]
  (let [hash (sha-256 (str nonce transacoes hash-anterior))]
    (if (hash-valido? hash 4)
      {:nonce nonce :hash hash}
      (recur (inc nonce) transacoes hash-anterior))))

(defn criar-bloco []
  (let [bloco-anterior (last @blocos-db)
        hash-anterior (if bloco-anterior
                        (:hash bloco-anterior)
                        "0000000000000000000000000000000000000000000000000000000000000000")
        dados (if bloco-anterior
                (ler-transacoes)
                "Bloco inicial")
        bloco (prova-de-trabalho 0 (ler-transacoes) hash-anterior)
        novo-bloco (assoc bloco
                          :id  (count @blocos-db)
                          :transacoes dados
                          :hash-anterior hash-anterior)]
    (swap! blocos-db conj novo-bloco)))