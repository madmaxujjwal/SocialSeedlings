declare module 'react-infinite-scroll-component' {
    import { Component } from 'react';
  
    interface Props {
      dataLength: number;
      next: () => void;
      hasMore: boolean;
      loader?: React.ReactNode;
    }
  
    export default class InfiniteScroll extends Component<Props> {}
  }
  