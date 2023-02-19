import React from "react";

export const Loader = () => {
  return (
    <div
      id="fixed z-[100] w-full h-full left-0 top-0"
      style={{ background: "rgba(0, 0, 0, 0.6)" }}
    >
      <div class="h-full flex justify-center items-center">
        <span
          class="w-10 h-10 animate-[sp-anime_0.8s_infinite_linear] rounded-[50%] border-4 border-[solid]@keyframes sp-anime {
            100% {
              transform: rotate(360deg);
            }
          }"
        ></span>
      </div>
    </div>
  );
};

const ComponentCopy = class Component extends React.Component {
  count = 0;

  componentDidMount() {
    const comp = Component;
    comp.instance = this;
  }

  componentWillUnmount() {
    const comp = Component;
    delete comp.instance;
  }

  show() {
    this.count = this.count + 1;
    this.forceUpdate();
  }

  hide() {
    this.count = this.count - 1;
    if (this.count < 0) {
      this.forceUpdate();
    }
    this.count = 0;
  }

  hideAll() {
    this.count = 1;
    this.forceUpdate();
  }

  isVisible() {
    return this.count > 0;
  }

  render() {
    return this.count > 0 ? <Loader /> : null;
  }
};

export const CommonLoader = {
  Component: ComponentCopy,
  show() {
    ComponentCopy.instance.show();
  },
  hide() {
    ComponentCopy.instance.hide();
  },
  hideAll() {
    ComponentCopy.instance.hideAll();
  },
  isVisible() {
    return ComponentCopy.instance.isVisible();
  },
};
