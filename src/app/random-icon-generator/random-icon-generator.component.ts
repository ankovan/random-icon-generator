import { Component } from '@angular/core';
import { IconLookup, IconName, IconPrefix, library } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition, IconPack } from '@fortawesome/fontawesome-common-types';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons';

// export interface IconPack {
//   [key: string]: IconDefinition;
// }

@Component({
  selector: 'app-random-icon-generator',
  templateUrl: './random-icon-generator.component.html',
  styleUrls: ['./random-icon-generator.component.scss']
})
export class RandomIconGeneratorComponent {
  currentRandomIcon = this.getRandomIcons();
  queueInterval: any = null;
  clickQueue: any = [];

  public getRandomIcons() {
    const icons: IconPack[] = Object.values((library as any).definitions) ||  [];
    const randomIconPackInex = Math.floor(Math.random() * icons.length);
    const randomIconPack = icons[randomIconPackInex];
    const randomIconKey = Object.keys(randomIconPack)[Math.floor(Math.random() * Object.keys(randomIconPack).length)];
    return {
      prefix: randomIconPackInex === 0 ? 'fas' : 'fab' as IconPrefix,
      iconName: randomIconKey as IconName,
      icon: randomIconPack[randomIconKey]
    };
  }
  public generateNewIcon()  {
    this.clickQueue.push(this.getRandomIcons());
    if (this.queueInterval === null) {
      this.queueInterval = setInterval(() => {
        if (this.clickQueue.length === 0) {
          clearInterval(this.queueInterval);
          this.queueInterval = null;
        } else {
          this.currentRandomIcon = this.clickQueue.shift();
        }
      }, 3000) 
    }
  }
}

