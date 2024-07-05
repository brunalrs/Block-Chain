import { Label } from "@radix-ui/react-label"
import InputCompleto from "./components/InputCompleto"
import { Button } from "./components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { useGetApi } from "./hooks/useGetApi"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "./components/ui/textarea"


function App() {
  const { getTransacoes, postTransacao, getSaldo, postBloco, getBlockchain } = useGetApi()
  const [transacoes, setTransacoes] = useState(null)
  const [blockchain, setBlockchain] = useState(null)
  const [saldo, setSaldo] = useState(null)
  const [transacao, setTransacao] = useState({
    tipo: null,
    valor: 0,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    await postTransacao(transacao)
    const saldo = await getSaldo()
    const transacoesAtualizadas = await getTransacoes()

    setTransacoes(transacoesAtualizadas)
    setSaldo(saldo)

    setTransacao({
      tipo: null,
      valor: 0,
    })
  }

  const handleGetBlockchain = async (e) => {
    e.preventDefault()
    await postBloco(transacao)
    const response = await getBlockchain()
    setBlockchain(response)
    
  }

  return (
    <>
      <h1 className="text-3xl font-semibold first:mt-0">Gerenciador Financeiro</h1>
      <div>
        <div>
          <div>
            <h2 className="text-2xl font-semibold mt-4">Adicionar Transação</h2>
            <form onSubmit={handleSubmit} className="flex items-end gap-4">
              <div>
                <Label htmlFor='tipo'>Tipo da Transação:</Label>
                <Select value={transacao.tipo} onValueChange={(value) => setTransacao({ ...transacao, tipo: value })} id='tipo' name='tipo'>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Tipo da Transação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receita">Receita</SelectItem>
                    <SelectItem value="despesa">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <InputCompleto value={transacao.valor} onChange={(e) => setTransacao({ ...transacao, valor: parseFloat(e.target.value) })} label="Valor:" id="valor" type="text" className='text-start flex-col mr-4' />
              <Button type='submit'>Adicionar Transação</Button>
            </form>
          </div>
          <div>
            <h2 className="mt-4 text-2xl font-semibold">Histórico de Transações - Saldo: R${saldo && saldo.saldo}</h2>
            <Table className='min-w-[600px] w-fit'>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead >Tipo</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transacoes && transacoes.map((item) => (
                  <TableRow>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell className='capitalize'>{item.tipo}</TableCell>
                    <TableCell>{item.valor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Blockchain</h2>
          <Button onClick={handleGetBlockchain}>Atualizar Blockchain</Button>
          {blockchain && <div className="flex flex-wrap">
            {blockchain.map((data) => (
              <Card>
                <CardHeader>
                  <CardTitle>Bloco {data['id']}</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-2'>
                  <InputCompleto className="flex-col" label='Nonce:' id='nonce' type='text' value={data['nonce']}  />
                  <div className="flex items-center gap-2 flex-col">
                    <Label htmlFor='data' className='w-[150px]'>Dados:</Label>
                    <Textarea id='data' name='data' className='min-h-40' value={JSON.stringify(data['transacoes'])}  />
                  </div>
                  <InputCompleto className="flex-col" label='Hash Anterior:' id='hash-anterior' type='text' value={data["hash-anterior"]}  />
                  <InputCompleto className="flex-col" label='Hash:' id='hash' type='text' value={data['hash']}  />
                </CardContent>
              </Card>
            ))}
          </div>}
        </div>
      </div>
    </>
  )
}

export default App
