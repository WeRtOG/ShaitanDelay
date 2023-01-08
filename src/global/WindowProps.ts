export interface WindowProperty {
    name: string;
    value: any;
}

export interface WindowPropertyChangeHandler {
    propertyName: string;
    handler: CallableFunction;
}

export class WindowProps {
    private props: WindowProperty[];
    private handlers: WindowPropertyChangeHandler[] = [];
    private genericHandlers: CallableFunction[] = [];

    public constructor(props: WindowProperty[]) {
        this.props = props;
    }

    public onPropertyChange(
        propertyName: string,
        handler: CallableFunction
    ): void {
        this.handlers.push({
            propertyName: propertyName,
            handler: handler,
        });
    }

    public onChange(handler: CallableFunction): void {
        this.genericHandlers.push(handler);
    }

    public setPropertyValue(propertyName: string, value: any): void {
        this.props.forEach((prop) => {
            if (prop.name === propertyName && prop.value !== value) {
                prop.value = value;

                this.genericHandlers.forEach((handler) => {
                    handler(prop);
                });
            }
        });

        this.handlers.forEach((handler) => {
            if (handler.propertyName === propertyName) {
                handler.handler(value);
            }
        });
    }

    public getPropertyValue(propertyName: string): any | null {
        return (
            this.props.find((prop) => {
                return prop.name === propertyName;
            })?.value ?? null
        );
    }

    public getAllProps(): WindowProperty[] {
        return this.props;
    }

    public getAllPropsExcept(propertyName: string) {
        return this.props.filter((prop) => prop.name !== propertyName);
    }
}
