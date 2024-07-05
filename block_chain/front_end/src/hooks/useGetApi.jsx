//p/ realizar requisições http
import axios from "axios"

export const useGetApi = () => {
    const getTransacoes = async () => {
        const response = await axios.get("http://localhost:3000/transacoes")

        return response.data
    }

    const postTransacao = async (transacao) => {
        const response = await axios.post("http://localhost:3000/criar-transacao", JSON.stringify(transacao), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
    }

    const getSaldo = async () => {
        const response = await axios.get("http://localhost:3000/saldo")
        return response.data
    }

    const postBloco = async (transacao) => {
        const response = await axios.post("http://localhost:3000/minerar", JSON.stringify(transacao), {
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return response.data
    }


    const getBlockchain = async () => {
        const response = await axios.get("http://localhost:3000/blocos")

        return response.data
    }

    return {
        getTransacoes,
        postTransacao,
        getSaldo,
        postBloco,
        getBlockchain
    }
}