export abstract class PlanetBasicComponent {
  protected loading: boolean;
  protected message: string;

  constructor(props) {}

  public showLoading(message: string = 'Loading...') {
    this.loading = true;
    this.message = message;
  }

  public hideLoading() {
    this.loading = false;
    this.message = '';
  }
}
