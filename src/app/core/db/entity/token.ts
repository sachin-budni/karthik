export class DbToken {
    constructor(
        public token: string,
        public value: string,
        public expiresAt: number) {
    }
}