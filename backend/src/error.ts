class InputError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InputError';
    }
}
  
class AccessError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AccessError';
    }
}
  
export { InputError, AccessError };