export function formatDate(date: Date): string {
    const dateFormat = new Date(date);
    return dateFormat.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}