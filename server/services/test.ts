import Container, { Service } from "typedi";

@Service()
export default class TestService {
  async test() {
    console.log("HELLO WORLD THIS IS A TEST SERVICE ");
  }
}
