
import Typography from '@material-ui/core/Typography';

const DefaultLogo = <Typography variant="h6" color="inherit">Moerae</Typography>

export default ({ type, height }) => {
  let Logo = DefaultLogo;
  const logoStyle = { height: 60 };
  if (typeof height === 'number') {
    logoStyle.height = height;
  }
  switch (type) {
    case 'icon':
      Logo = <img src="/static/moerae-logo-icon.svg" style={logoStyle} />
      break;
    case 'standard':
      Logo = <img src="/static/moerae-logo.svg" style={logoStyle} />
      break;
    default:
      break;
  }
  return Logo;
}