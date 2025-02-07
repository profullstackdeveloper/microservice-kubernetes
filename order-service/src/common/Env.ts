import jetEnv, { num, str } from 'jet-env';
import { isEnumVal } from 'jet-validators';

import { NodeEnvs } from './constants';


/******************************************************************************
                            Export default
******************************************************************************/

export default jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
  Port: num,
  // DBHost: str,
  // DBName: str,
  // DBPwd: str,
  // DBPort: num,
  // DBUser: str
});
