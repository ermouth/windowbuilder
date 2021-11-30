/**
 * Переопределяем поведение параметра _Список заполнений_
 *
 * @module glasses_list
 *
 * Created by Evgeniy Malyarov on 29.11.2021.
 */

export default function ({properties, utils}) {
  const glasses_list = properties.predefined('glasses_list');
  if(glasses_list) {

    import('../../components/CchProperties/GlassesList')
      .then((module) => {
        glasses_list.Editor = module.default;
      });

    glasses_list.extract_pvalue = function ({ox, cnstr, elm, origin}) {
      const {product_params, params} = ox;
      const inset = (typeof origin !== 'number' && origin) || utils.blank.guid;
      let value = [];
      if(params) {
        params.find_rows({param: this, region: 0, cnstr, inset}, ({txt_row}) => {
          if(txt_row) {
            try {
              value = JSON.parse(txt_row);
            }
            catch (e) {}
          }
          return false;
        });
      }
      return value;
    };

    glasses_list.set_pvalue = function ({ox, cnstr, elm, origin, value}) {
      const {product_params, params} = ox;
      const inset = (typeof origin !== 'number' && origin) || utils.blank.guid;
      if(params) {
        let prow;
        params.find_rows({param: this, region: 0, cnstr, inset}, (row) => {
          prow = row;
          return false;
        });
        if(!prow) {
          prow = params.add({param: this, region: 0, cnstr, inset});
        }
        prow.txt_row = JSON.stringify(value);
      }
      return true;
    };

  }
}
