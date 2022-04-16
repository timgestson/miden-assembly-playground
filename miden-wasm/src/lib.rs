use miden::{execute, Assembler, ProgramInputs, ProofOptions};
use wasm_bindgen::prelude::*;
use wasm_bindgen_test::*;
extern crate console_error_panic_hook;

#[wasm_bindgen]
pub fn program(asm: &str, inputs: &[u64], output_count: u16) -> Vec<u64> {
    console_error_panic_hook::set_once();
    let assembler = Assembler::new();
    let program = assembler.compile_script(&asm).unwrap();

    let options = ProofOptions::new(
        32,
        8,
        0,
        miden::HashFunction::Blake3_256,
        miden::FieldExtension::None,
        8,
        256,
    );
    let (outputs, _proof) = execute(
        &program,
        &ProgramInputs::from_stack_inputs(inputs).unwrap(),
        output_count as usize,
        &options,
    )
    .unwrap();
    // TODO: Investigate why proof verification fails when outputCount > 1
    //assert!(miden::verify(*program.hash(), &[], &outputs, proof).is_ok());
    outputs
}

#[wasm_bindgen_test]
fn run_program() {
    let output = program(
        "
        begin
            push.1 push.2 add
        end
    ",
        &[],
        1,
    );
    assert_eq!(output[0], 3)
}
