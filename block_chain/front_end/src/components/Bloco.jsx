
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import InputCompleto from './InputCompleto'

const Bloco = ({ data }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bloco {data['id']}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
                <InputCompleto label='Nonce:' id='nonce' type='text' value={data['nonce']} disabled />
                <div className="flex items-center text-end gap-2">
                    <Label htmlFor='data' className='w-[150px]'>Dados:</Label>
                    <Textarea id='data' name='data' className='min-h-40' value={data['dados']} disabled />
                </div>
                <InputCompleto label='Hash Anterior:' id='hash-anterior' type='text' value={data["hash-anterior"]} disabled />
                <InputCompleto label='Hash:' id='hash' type='text' value={data['hash']} disabled />
            </CardContent>
        </Card>
    )   
}

export default Bloco