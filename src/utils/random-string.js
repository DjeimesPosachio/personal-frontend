export function getRamdomicString() {
    const firstStep = Math.random().toString().split('.')[1];
    const lastStep = Math.random().toString().split('.')[1] + Date.now();

    const ramdomicString = `${firstStep + lastStep}`;

    return ramdomicString;
}