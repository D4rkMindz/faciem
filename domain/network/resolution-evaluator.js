import NetworkSpeed from 'network-speed';
import { SpeedLimits } from '@/domain/network/speed-limits';

export class ResolutionEvaluator {
  /**
   * Detect the best resolution based on the network speed
   * @return {Promise<number>}
   */
  async getBestResolution() {
    const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000';
    const fileSize = 500000;
    const testNetworkSpeed = new NetworkSpeed();
    const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSize);
    this.speed = speed;

    let resolution = 144;
    if (speed.kbps <= SpeedLimits.LOW) {
      resolution = 144;
    }
    if (speed.kbps > SpeedLimits.LOW && speed.kbps <= SpeedLimits.FWQVGA) {
      resolution = 240;
    }
    if (speed.kbps > SpeedLimits.FWQVGA && speed.kbps <= SpeedLimits.nHD) {
      resolution = 360;
    }
    if (speed.kbps > SpeedLimits.nHD && speed.kbps > SpeedLimits.FWVGA) {
      resolution = 480;
    }
    if (speed.kbps > SpeedLimits.FWVGA && speed.kbps <= SpeedLimits.HD) {
      resolution = 720;
    }
    if (speed.kbps > SpeedLimits.HD) {
      resolution = 1080;
    }

    return resolution;
  }
}
