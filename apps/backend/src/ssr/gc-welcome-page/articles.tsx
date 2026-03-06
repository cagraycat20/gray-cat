import * as React from 'react';
import { pagePath as pp } from '../../constants';
import {
  notGiveUpSmallPng,
  roadSignSmall,
  stepOnNailSmall,
  tube,
} from '../assets';

export interface ArticleInfo {
  title: string;
  text: React.ReactNode;
  image: string;
  imageRight?: boolean;
  link: string;
}

export const articles: Array<ArticleInfo> = [
  {
    title: 'Human is not a Test Tube!',
    text: (
      <>
        OK, I open Google, type "burn fat" and get a lot of results.
        Hm… Very well! Seems like this thing has been thoroughly investigated,
        and it will be quite easy to get appropriate help with questions I’m interested in.
        I open a few pages and see that everywhere the main idea is the same –
        <b> control of calories</b>. OK, it makes sense. I go on googling...
      </>
    ),
    image: tube,
    link: pp.pointlessCalculations,
  },
  {
    title: 'Action Strategy',
    text: (
      <>
        Disappointed in universal formulas calculating the number of calories,
        I’m sitting with my head sadly resting on my hands. If this approach is ineffective,
        then what shall I start with? How shall I build a working strategy to <b>fight snow-white fat </b>
        being stored enthusiastically under my skin? There must be a <b>rational method</b> tested by a
        lot of competent people. Right?..
      </>
    ),
    image: roadSignSmall,
    imageRight: true,
    link: pp.realStrategy,
  },
  {
    title: 'Be Aware!',
    text: (
      <>
        OK, very well. I know what to do to <b>liquidate unwanted fat</b> stores resting under my skin.
        Plan of action is quite clear and it doesn’t look very complicated.
        But somehow I feel it’s so easy only on paper. <b>Right?</b><br/>
        ***<br/>
        <b>Right!</b><br/>
        No one said it would be very easy...
      </>
    ),
    image: stepOnNailSmall,
    imageRight: false,
    link: pp.danger,
  },
  {
    title: 'How not to Give Up',
    text: (
      <>
        OK, now I understand which strategy I need to follow for optimal progress,
        and I’m aware of possible <b>dangers</b> on the way to my goal.
        But I assume that the result <b>won’t be immediate</b>.
        I’ll need to keep to the built scheme for quite a long time.
        And I’ve got a feeling it <b>won’t be easy</b> to hold on
        and <b>not to give up</b> halfway through.<br/>
        <b>Right?...</b><br/>
      </>
    ),
    image: notGiveUpSmallPng,
    imageRight: true,
    link: pp.howNotToGiveUp,
  },
];
