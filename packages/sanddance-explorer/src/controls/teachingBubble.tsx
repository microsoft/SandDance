// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as React from 'react';
import { base } from '../base';
import { RecommenderSummary } from '@msrvida/recommender';
import { FabricTypes } from '@msrvida/office-ui-fabric-react-cdn-typings';
import { Recommendation, Recommender } from '@msrvida/recommender/dist/es5/recommender';
import { State, Explorer } from '../explorer';

export interface Props extends FabricTypes.ITeachingBubbleProps {
    changeChart?: Explorer;
    target?: HTMLElement;
    rec?: State;
    title?: string;
    children?: string | React.ReactText[] | JSX.Element | JSX.Element[];
    buttons?: JSX.Element | JSX.Element[];
   
}


export function TeachingBubble(props: Props) {
    if(!props.rec.dataContent) return null;
    let r = new RecommenderSummary(props.rec.dataContent.columns, props.rec.dataContent.data);
    let rec = r.recommend();
    let _menuButtonElement: HTMLElement;
    const change = ()=> {
        props.changeChart.changeInsight(rec);
      };
    const examplePrimaryButton: FabricTypes.IButtonProps = {
        children: 'Try it out',
        onClick: change
    };

    return (
      <div className="ms-TeachingBubbleExample">
        <span className="ms-TeachingBubbleBasicExample-buttonArea" ref={menuButton => (_menuButtonElement = menuButton!)}>
            
        </span>
          <div>
            <base.fabric.TeachingBubble
              target={{x:1600, y:1000}}
              hasCloseIcon={true}
              primaryButtonProps={examplePrimaryButton}
              headline="We have a chart recommendation for you"
            >
            Based on your data input we recommend {rec.chart} for you
            </base.fabric.TeachingBubble>
          </div>
      </div>
    );
  }

