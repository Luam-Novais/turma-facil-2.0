export function formatName(name: string): string{
    const formatFirst = name.slice(0, 1).toUpperCase();
    return formatFirst.concat(name.slice(1));
}