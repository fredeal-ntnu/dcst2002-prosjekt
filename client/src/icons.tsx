import * as React from 'react';
import { Component } from 'react-simplified';

// Base Icon class that other specific icons will extend
class BaseIcon extends Component<{ size?: number; color?: string; style?: React.CSSProperties }> {
  // Default SVG properties
  size = this.props.size || 16;
  color = this.props.color || 'currentColor';
  style = this.props.style || {};

  // Method to get the SVG content - to be implemented by subclasses
  getSvg() {
    return '';
  }

  // Render method to display the SVG
  render() {
    // Apply the style adjustments including vertical alignment
    const svgStyle = {
      verticalAlign: '-0.125em', // Adjust the alignment as needed
      ...this.style // Allow for additional styles to be applied
    };

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.size}
        height={this.size}
        fill={this.color}
        viewBox="0 0 16 16"
        style={svgStyle}
        dangerouslySetInnerHTML={{ __html: this.getSvg() }}
      />
    );
  }
}

// Specific EyeIcon class
export class EyeIcon extends BaseIcon {
  getSvg() {
    return `
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    `;
  }
}

export class SearchIcon extends BaseIcon {
    getSvg() {
      return `
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      `;
    }
  }

