import MaskedInput from 'react-text-mask';

type Props = any;

function Base(props: Props) {
  var propsClone = Object.assign({}, props);
  delete propsClone.inputRef;
  return <MaskedInput placeholderChar={'\u2000'} showMask={false} guide={false} {...propsClone} />;
}

export function CPF(props: Props) {
  return (
    <Base
      {...props}
      mask={[
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '.',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '.',
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        '-',
        /[0-9]/,
        /[0-9]/,
      ]}
    />
  );
}

export function CEP(props: Props) {
  return (
    <Base {...props} mask={[/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]} />
  );
}

export function Date(props: Props) {
  return <Base {...props} mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]} />;
}
