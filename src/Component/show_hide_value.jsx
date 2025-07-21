import show from '../assets/icon/Show.svg'
import hide from '../assets/icon/Hide.svg'
export default function HideShowValue({showPassword, onClick, className}) {
    return <img src={showPassword ? hide : show} onClick={onClick} className={`w-8 fixed ${className}`}  />
}