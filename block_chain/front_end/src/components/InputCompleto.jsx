import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { cn } from "@/lib/utils"

const InputCompleto = ({className, label, id, type, ...props}) => {
    return (
        <div className={cn("flex", className)}>
            <label htmlFor={id} className='w-[160px] mb-0'>{label}</label>
            <Input type={type} id={id} name={id} className='h-10' {...props} />
        </div>
    )
}

export default InputCompleto