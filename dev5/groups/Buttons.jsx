import React from 'react';
import Group from '../../jsx/Group.jsx';
import Btn from '../../jsx/Btn.jsx';
import Block from './Block.jsx';

export default ({}) => {
    const onBtnClick = (o) => {
        console.log(o);
    };
    return (
        <Group caption='buttons'>
            <Block>
                <Btn id="btn-test" disabled={true} onClick={onBtnClick}>disabled</Btn>
                <Btn id="btn-test-2" onClick={onBtnClick}>button</Btn>
                <Btn className="wd-primary">wd-primary</Btn>
                <Btn className="wd-danger" hint="wd-danger hint">wd-danger</Btn>
                <Btn className="wd-secondary">wd-secondary</Btn>
                <Btn className="wd-success" hint="wd-danger hint">wd-success</Btn>
                <Btn className="wd-warning">wd-warning</Btn>
                <Btn className="wd-info">wd-info</Btn>
                <Btn className="wd-light">wd-light</Btn>
                <Btn className="wd-dark">wd-dark</Btn>
                <br/><br/>
                <Btn className="wd-flat">wd-flat</Btn>
                <Btn className="wd-primary wd-flat">wd-primary</Btn>
                <Btn className="wd-danger wd-flat" hint="wd-danger hint">wd-danger</Btn>
                <Btn className="wd-secondary wd-flat">wd-secondary</Btn>
                <Btn className="wd-success wd-flat" hint="wd-danger hint">wd-success</Btn>
                <Btn className="wd-warning wd-flat no-border">wd-warning</Btn>
                <Btn className="wd-info wd-flat">wd-info</Btn>
                <Btn className="wd-light wd-flat">wd-light</Btn>
                <Btn className="wd-dark wd-flat">wd-dark</Btn>
                <br/><br/>
            </Block>

            <Block>
                <div className="wd-panel" right='' style={{ }}>
                    <Btn className="wd-primary only-text">wd-primary</Btn>
                    <Btn className="wd-danger only-text" hint="wd-danger hint">wd-danger</Btn>
                    <Btn className="wd-secondary-color">wd-secondary</Btn>
                    <Btn className="wd-success-color" hint="wd-danger hint">wd-success</Btn>
                    <Btn className="wd-warning-color">wd-warning</Btn>
                    <Btn className="wd-info-color">wd-info</Btn>
                    <Btn className="wd-light-color">wd-light</Btn>
                    <Btn className="wd-dark-color">wd-dark</Btn>

                    <Btn className="wd-transparent">wd-transparent</Btn>
                    <Btn className="wd-primary pic-bag">pic</Btn>
                </div>
            </Block>
            <Block>
                <div className="wd-panel" filled='' style={{ border: '1px dashed red' }}>
                    <div style={{ border: '1px dashed blue', width: 32 }}></div>
                    <div style={{ border: '1px dashed white' }} stretch='' className="mg"></div>
                    <div style={{ border: '1px dashed green', width: 32 }}></div>
                </div>
            </Block>
        </Group>
    );
};
