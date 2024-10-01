export function formatCpfCnpj(value: string) {
    const cleanedValue = value.replace(/\D/g, ''); // remove caracteres não numéricos
  
    // CPF
    return cleanedValue
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
}

export function formatTel(value: string) {
    const cleanedValue = value.replace(/\D/g, ''); // remove caracteres não numéricos
    
    // tel
    if (cleanedValue.length > 10) {
        return cleanedValue
        .replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    } else {
        return cleanedValue
            .replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3');
    }
    
}
