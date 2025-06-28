// Your use of the content in the files referenced here is subject to the terms of the license at https://aka.ms/fabric-assets-license

// tslint:disable:max-line-length

import { IIconSubset } from '@uifabric/styling';
import { fabricIconsWoff } from './fabric_icons_4ac17eec';

export function initializeIcons() {
    const subset: IIconSubset = {
        style: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            fontStyle: 'normal',
            fontWeight: 'normal',
            speak: 'none',
        },
        fontFace: {
            fontFamily: '"FabricMDL2Icons"',
            src: `url("${fabricIconsWoff}") format("woff")`,
        },
        icons: {
            Accept: '\uE8FB',
            Add: '\uE710',
            BIDashboard: '\uF543',
            Camera: '\uE722',
            Cancel: '\uE711',
            ChevronDown: '\uE70D',
            ChevronLeftMed: '\uE973',
            ChevronRightMed: '\uE974',
            Clear: '\uE894',
            ClearFilter: '\uEF8F',
            ClearNight: '\uE9C2',
            CloudDownload: '\uEBD3',
            Color: '\uE790',
            Copy: '\uE8C8',
            CubeShape: '\uF1AA',
            Delete: '\uE74D',
            Diamond: '\uED02',
            DiamondSolid: '\uF34C',
            DoubleChevronLeft12: '\uEE98',
            DoubleChevronRight12: '\uEE99',
            Download: '\uE896',
            Edit: '\uE70F',
            Filter: '\uE71C',
            Filters: '\uE795',
            FiltersSolid: '\uF353',
            Flow: '\uEF90',
            History: '\uE81C',
            HourGlass: '\uEA03',
            More: '\uE712',
            Next: '\uE893',
            OpenInNewWindow: '\uE8A7',
            Page: '\uE7C3',
            Pause: '\uE769',
            Photo2Add: '\uECAB',
            Photo2Remove: '\uECAC',
            PicturePosition: '\uF524',
            Pin: '\uE718',
            Pinned: '\uE840',
            PlayResume: '\uF2C6',
            PlayReverseResume: '\uF3E4',
            Previous: '\uE892',
            RadioBtnOff: '\uECCA',
            RadioBtnOn: '\uECCB',
            RadioBullet: '\uE915',
            Redo: '\uE7A6',
            RemoveFilter: '\uEB08',
            ScaleVolume: '\uF18C',
            Search: '\uE721',
            Settings: '\uE713',
            SortDown: '\uEE69',
            SortUp: '\uEE68',
            Sunny: '\uE9BD',
            Table: '\uED86',
            Undo: '\uE7A7',
        },
    };

    return subset;
}
