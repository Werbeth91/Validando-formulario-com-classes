class ValidandoFormulario {
  constructor() {
    this.form = document.querySelector(".form");
    this.eventosForm();
  }
  eventosForm() {
    this.form.addEventListener("submit", (event) => {
      this.enviarForm(event);
    });
  }
  //método que enviar o formulario depois de validado
  enviarForm(event) {
    event.preventDefault();
    const inputsValidados = this.validandoCamposDosInputs();
    const senhasValidas = this.validandoSenhas();

    if (inputsValidados && senhasValidas) {
      alert("Formulário enviado com sucesso!");
      this.form.submit();
    }
  }
  //método que valida as senhas
  validandoSenhas() {
    let senhaValida = true;

    const senha1 = this.form.querySelector(".senha1");
    const senha2 = this.form.querySelector(".senha2");

    if (senha1.value !== senha2.value) {
      senhaValida = false;
      this.criarMsgDeErro(senha1, "Senhas não conferem!");
      this.criarMsgDeErro(senha2, "Senhas não conferem!");
    }

    if (senha1.value.length < 6 || senha1.value.length > 12) {
      senhaValida = false;
      this.criarMsgDeErro(
        senha1,
        "Sua senha precisa ter entre 6 e 12 caracteres"
      );
    }
    return senhaValida;
  }

  //Método que verifica se cada input ta preenchido corretamente
  validandoCamposDosInputs() {
    let inputValido = true;

    for (let erro of this.form.querySelectorAll(".mensagem-erro")) {
      erro.remove();
    }

    for (let input of this.form.querySelectorAll(".valido")) {
      const label = input.previousElementSibling.innerText;

      if (!input.value) {
        this.criarMsgDeErro(input, `O campo "${label}" nao pode estar vazio`);
        inputValido = false;
      }
      if (input.classList.contains("cpf")) {
        if (!this.validandoCPF(input)) inputValido = false;
      }
      if (input.classList.contains("usuario")) {
        if (!this.validandoUsuario(input)) inputValido = false;
      }
    }
    return inputValido;
  }
  //metodo que valida o campo usuario
  validandoUsuario(input) {
    const usuario = input.value;
    let validado = true;
    if (usuario.length < 3 || usuario.length > 12) {
      this.criarMsgDeErro(
        input,
        "Nome de usuário precisa ter entre 3 e 12 caracteres"
      );
      validado = false;
    }
    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
      this.criarMsgDeErro(
        input,
        "Nome de usuário só pode conter letras e/ou numeros"
      );
      validado = false;
    }
    return validado;
  }
  //método que valida o compo cpf
  validandoCPF(input) {
    const cpf = new ValidarCPF(input.value);

    if (!cpf.validacao()) {
      this.criarMsgDeErro(input, "CPF inválido");
      return false;
    }
    return true;
  }
  //métod que cria a mensagem de erro e coloca a abaixo do input náo validado
  criarMsgDeErro(input, mensagem) {
    const div = document.createElement("div");
    div.innerHTML = mensagem;
    div.classList.add("mensagem-erro");
    input.insertAdjacentElement("afterend", div);
  }
}

const formValidado = new ValidandoFormulario();
