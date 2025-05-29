
interface ButtonProps {
    label: string;
    onClick: () => void;
    type: 'alert' | 'success' | 'warning' | 'default';
}

export function Button({ label, onClick, type = 'default' }: ButtonProps) {
    let buttonTypeBg = "";

    switch (type) {
        case 'alert':
            buttonTypeBg = "bg-red-500 hover:bg-red-700";
            break;
        case 'success':
            buttonTypeBg = "bg-green-500 hover:bg-green-700";
            break;
        case 'warning':
            buttonTypeBg = "bg-yellow-500 hover:bg-yellow-700";
            break;
        default:
            buttonTypeBg = "bg-gray-500 hover:bg-gray-700";
    }
    return (
        <button onClick={onClick} className={`${buttonTypeBg} text-white font-bold py-2 px-4 rounded`}>
            {label}
        </button>
    )
}