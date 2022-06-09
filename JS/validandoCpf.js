class ValidarCPF {
  constructor(cpfRecebido) {
    Object.defineProperty(this, "cpfSemCaracteres", {
      writable: false,
      enumerable: true,
      configurable: false,
      value: cpfRecebido.replace(/\D+/g, ""),
    });
  }
  //método que confere todas as validadações
  validacao() {
    if (!this.cpfSemCaracteres) return false;
    if (typeof this.cpfSemCaracteres !== "string") return false;
    if (this.cpfSemCaracteres.length !== 11) return false;
    if (this.verificarSequencia()) return false;
    this.gerarCpfDeValidacao();
    console.log(this.cpfDeValidacao);
    return this.cpfDeValidacao === this.cpfSemCaracteres;
  }
  //método que conferi se o cpf não é uma sequencia de numeros iguais
  verificarSequencia() {
    return this.cpfSemCaracteres.charAt(0).repeat(11) === this.cpfSemCaracteres;
  }
  //método que gera o cpf que vai ser usado de comparação
  gerarCpfDeValidacao() {
    const cpfSemDigitos = this.cpfSemCaracteres.slice(0, -2);
    const digito1 = ValidarCPF.validarDigito(cpfSemDigitos);
    const digito2 = ValidarCPF.validarDigito(cpfSemDigitos + digito1);

    this.cpfDeValidacao = cpfSemDigitos + digito1 + digito2;
  }
  //método estatico que vai calcular os digitos do cpf recebido
  static validarDigito(cpfSemDigitos) {
    let soma = 0;
    let multiplicador = cpfSemDigitos.length + 1;
    for (let cpfEmString of cpfSemDigitos) {
      soma += multiplicador * Number(cpfEmString);
      multiplicador--;
    }
    const digito = 11 - (soma % 11);
    return digito <= 9 ? String(digito) : "0";
  }
}
