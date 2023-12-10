import React from 'react';

class ErrorBound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error,
            errorInfo,
        });
        // You can also log error messages to an error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
        // Error path
            return (
                <div className='error-bound'>
                    <h2>Error: {this.props.caption || ''}</h2>
                    <div style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </div>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}
export default ErrorBound;
