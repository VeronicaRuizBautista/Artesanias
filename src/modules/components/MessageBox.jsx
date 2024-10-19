export const MessageBox = ({ transmitter, texto, timestamp }) => {
    return (
        <div className={`${transmitter === 'server' ? 'bg-9D1A1A' : 'bg-703A31'} break-words p-4 relative rounded-lg max-w-[70%] text-blanco font-bold ${transmitter === 'cliente' ? 'self-end' : ''}`}>
            {texto}
            <div className="text-gray-400 text-xs">
                {transmitter} - {new Date(timestamp).toLocaleString()}
            </div>
        </div>
    );
};
