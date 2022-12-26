import React from 'react';
// import { flex, binds } from 'fmihel-browser-lib'
export default class TableHead extends React.Component {
    constructor(p) {
        super(p);
    }

    render() {
        const { fields } = this.props;
        return (

            <tr>
                {fields.map((field) => {
                    const { width } = field;
                    const style = {};
                    if (width !== undefined) style.width = width;
                    return (
                        <th
                            key={field.name}
                            style={{ ...style }}
                        >
                            {field.caption ? field.caption : field.name}
                        </th>
                    );
                })}
            </tr>

        );
    }
}
TableHead.defaultProps = {
    fields: [
        { name: 'ID', caption: 'id' },
        { name: 'NAME', caption: 'name' },
        { name: 'AGE', caption: 'age' },
    ],
};
