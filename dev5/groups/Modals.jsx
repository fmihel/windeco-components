import React, { useState } from 'react';
import Group from '../../jsx/Group.jsx';
import Block from './Block.jsx';
import Btn from '../../jsx/Btn.jsx';
import Modal from '../../jsx/Modal.jsx';

export default ({}) => {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const doShow1 = () => {
        setShow1(true);
    };
    const doShow2 = () => {
        setShow2(true);
    };
    const doClose1 = () => {
        setShow1(false);
    };
    const doClose2 = () => {
        setShow2(false);
    };

    return (
        <Group caption="Modal">
            <Block>
                <Btn onClick={doShow1} >show1</Btn>
                { <Modal
                    id="test-modal1"
                    visible={show1}
                    onClickShadow={doClose1}
                >
                    <div
                        style={{
                            position: 'absolute',
                            left: 100,
                            top: 100,
                            width: 200,
                            height: 200,
                            border: '1px solid navy',
                            background: 'gray',
                        }}>
                        <Btn onClick={doShow2}>show2</Btn>

                    </div>

                </Modal>
                }
            </Block>
            <Block>
                <Btn onClick={doShow1} >show2</Btn>
                { <Modal
                    id="test-modal2"
                    visible={show2}
                    onClickShadow={doClose2}
                >
                    <div
                        style={{
                            position: 'absolute',
                            left: 100,
                            top: 100,
                            width: 200,
                            height: 200,
                            border: '1px solid red',
                            background: 'silver',
                        }}>
                        <Btn onClick={doShow1} >show1</Btn>

                    </div>

                </Modal>
                }
            </Block>
        </Group>);
};
