export default class HumanIngressFixture {
  constructor() {
    this.calls = [];
    this.accept = async (input) => this.calls.push(input);
  }
}
