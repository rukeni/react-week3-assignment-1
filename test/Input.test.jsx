import { fireEvent, render } from '@testing-library/react';

import Input from '../src/Input';

describe('Input', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  const renderComponent = (value = '') => {
    const { container, getByRole } = render((
      <Input
        value={value}
        onChange={handleChange}
        onClick={handleClick}
      />
    ));
    const input = getByRole('textbox', { name: /할 일/i });
    const addButton = getByRole('button', { name: /추가/i });

    return {
      container, getByRole, input, addButton,
    };
  };

  it('Input 컴포넌트가 렌더링 된다.', () => {
    const { container, input } = renderComponent('hello');

    expect(container).not.toBe(null);
    expect(input).toHaveValue('hello');
    expect(container).toHaveTextContent('할 일');
    expect(container).toHaveTextContent('추가');
  });

  it('입력 시, onChange 함수가 호출된다.', () => {
    const { input } = renderComponent();

    fireEvent.change(input, { target: { value: 'hello' } });
    expect(handleChange).toBeCalled();
  });

  it('추가 버튼 클릭 시, onClick 함수가 실행된다.', () => {
    const { addButton } = renderComponent();

    fireEvent.click(addButton);

    expect(handleClick).toBeCalled();
  });
});